namespace Disco.FSharp

open System

/// Inspired by:
/// https://github.com/BlueMountainCapital/Deedle/blob/master/src/Deedle/Common/Common.fs
[<Struct; CustomEquality; NoComparison>]
type Opt<'T> private(hasValue:bool, value:'T) =

    static member Missing = Opt(false, Unchecked.defaultof<'T>)
    
    // overload for `==`
    static member op_Equality (a:Opt<'T>, b:Opt<'T>) = a.Equals(b)
    // overload for `!=`
    static member op_Inequality (a:Opt<'T>, b:Opt<'T>) = not(a.Equals(b))

    new(value:'T) = Opt(true, value)

    member this.HasValue = hasValue

    member this.ValueOrDefault = value

    member this.Value =
        if hasValue then value
        else invalidOp "This Opt<'T> has no value. Please check `HasValue` first or use `ValueOrDefault`."

    override this.ToString() =
        match hasValue with
        | true when Object.Equals(null, value) -> "<null>"
        | false -> "<missing>"
        | _ -> value.ToString()

    override this.GetHashCode() =
        match box this.ValueOrDefault with
        | null -> 0
        | any -> any.GetHashCode()

    override this.Equals(other) =
        match other with
        | null -> false
        | :? Opt<'T> as other -> Object.Equals(this.ValueOrDefault, other.ValueOrDefault)
        | _ -> false